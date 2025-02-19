import { Link } from "@inertiajs/react";

type Props = {
    links: [
        {
            label: string;
            url: string;
            active?: boolean;
        }
    ];
    queryParams: { [key: string]: string };
    from: number;
    to: number;
    total: number;
};

export default function Pagination({
    links,
    queryParams,
    from,
    to,
    total,
}: Props) {
    if (queryParams["page"]) {
        delete queryParams["page"];
    }
    const queryString = new URLSearchParams(queryParams).toString() || "";

    return (
        <div className="flex justify-between gap-5 items-center pt-3 dark:text-gray-300 text-gray-800">
            <p className="text-sm">
                Showing {from} to {to} of {total} entries
            </p>

            <nav className="text-center">
                {links.map((link, id) => (
                    <Link
                        preserveScroll
                        href={
                            queryString !== ""
                                ? link.url + "&" + queryString
                                : link.url
                        }
                        key={id}
                        className={`inline-block py-2 px-3 rounded-lg text-gray-200 text-xs ${
                            link.active ? "bg-gray-950" : " "
                        } ${
                            !link.url
                                ? "!text-gray-500 cursor-not-allowed"
                                : "hover:bg-gray-950"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                ))}
            </nav>
        </div>
    );
}
