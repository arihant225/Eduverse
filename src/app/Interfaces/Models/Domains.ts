export interface Domain {
    domainId: number;
    domainName: string;
    subDomains: Domain[];
    status?: string | null;
    parentDomainId?: number | null;
    refreshContext?:boolean
}

export interface domainAction{
    action:string,
    domain:Domain,
    parentDomain:(Domain|null)[]
}