import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

type Props = {
    fieldName: string;
    fieldValue: string;
    handleSorting: (field: string) => void;
    sort_field: string;
    sort_order: string;
};

export default function SortedTableHeadCell({
    fieldName,
    fieldValue,
    handleSorting,
    sort_field,
    sort_order,
}: Props) {
    return (
        <div className="flex items-center gap-1">
            <div className="flex flex-col">
                <ChevronUpIcon
                    onClick={() => handleSorting(fieldValue)}
                    className={`w-5 -mb-3 hover:text-white hover:cursor-pointer ${
                        sort_field === fieldValue && sort_order === "desc"
                            ? "text-white"
                            : ""
                    }`}
                />
                <ChevronDownIcon
                    onClick={() => handleSorting(fieldValue)}
                    className={`w-5  hover:text-white hover:cursor-pointer ${
                        sort_field === fieldValue && sort_order === "asc"
                            ? "text-white"
                            : ""
                    }`}
                />
            </div>
            <p className="text-nowrap">{fieldName}</p>
        </div>
    );
}
