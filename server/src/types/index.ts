export interface PackageProps {
package_name:string,
    keywords: string[],
    time_uploaded: string,
    license:string,
    version:string,
    description: string,
    links: { name: string, URL: string }[],
    total_downloads: string,
    owners: {name:string, profile:string, user_url:string}[]
}
