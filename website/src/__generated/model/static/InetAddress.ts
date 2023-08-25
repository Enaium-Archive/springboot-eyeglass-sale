export interface InetAddress {
    
    readonly address: ReadonlyArray<number>;
    
    readonly anyLocalAddress: boolean;
    
    readonly canonicalHostName: string;
    
    readonly hostAddress: string;
    
    readonly hostName: string;
    
    readonly linkLocalAddress: boolean;
    
    readonly loopbackAddress: boolean;
    
    readonly mcglobal: boolean;
    
    readonly mclinkLocal: boolean;
    
    readonly mcnodeLocal: boolean;
    
    readonly mcorgLocal: boolean;
    
    readonly mcsiteLocal: boolean;
    
    readonly multicastAddress: boolean;
    
    readonly siteLocalAddress: boolean;
}
