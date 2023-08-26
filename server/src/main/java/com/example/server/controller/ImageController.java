package com.example.server.controller;

import cn.dev33.satoken.annotation.SaIgnore;
import com.example.server.model.entitiy.Image;
import com.example.server.model.entitiy.ImageDraft;
import com.example.server.model.entitiy.ImageTable;
import jakarta.servlet.http.HttpServletResponse;
import org.babyfish.jimmer.sql.JSqlClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {

    private final JSqlClient sql;
    private final String imageDir;

    private static final ImageTable IMAGE_TABLE = ImageTable.$;

    public ImageController(JSqlClient sql, @Value("${eyeglass.image.dir}") String imageDir) {
        this.sql = sql;
        this.imageDir = imageDir;
    }

    @SaIgnore
    @GetMapping("/images/{id}/")
    public void getImage(@PathVariable int id, HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        final Image image = sql.createQuery(IMAGE_TABLE).where(IMAGE_TABLE.id().eq(id)).select(IMAGE_TABLE).fetchOptional().orElseThrow();
        httpServletResponse.getOutputStream().write(Files.readAllBytes(Paths.get(System.getProperty("user.dir"), imageDir, image.hash32())));
    }

    @PostMapping("/images/")
    public int uploadImage(@RequestParam MultipartFile file) throws IOException {
        String hash = DigestUtils.md5DigestAsHex(file.getBytes());
        final Image image = sql.createQuery(IMAGE_TABLE).where(IMAGE_TABLE.hash32().eq(hash)).select(IMAGE_TABLE).fetchOneOrNull();
        if (image != null) {
            return image.id();
        } else {
            final Path path = Paths.get(System.getProperty("user.dir"), imageDir, hash);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return sql.insert(ImageDraft.$.produce(draft -> {
                draft.setHash32(hash);
            })).getModifiedEntity().id();
        }
    }
}
