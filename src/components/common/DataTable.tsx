import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  actions?: boolean;
  customActions?: (row: any) => React.ReactNode;
  headerRight?: React.ReactNode;
}

export const DataTable = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  actions = true,
  customActions,
  headerRight,
}: DataTableProps) => {

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // FILTER DATA BY SEARCH
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredData.length / entries);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * entries;
    return filteredData.slice(start, start + entries);
  }, [filteredData, page, entries]);

  return (
    <div className="mt-6 w-full">

      {/* TITLE OUTSIDE CARD */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Total entries: {data.length}
          </span>
        <div className="flex items-center gap-2">
          {/* <span className="text-sm font-medium bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Total entries: {data.length}
          </span> */}
          {headerRight}
        </div>
      </div>


      <Card>
        <CardContent className="p-4 pb-0">

          {/* TOP BAR: SHOW ENTRIES + SEARCH */}
          <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">

            {/* Show Entries */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>

              <Select
                value={String(entries)}
                onValueChange={(v) => {
                  setEntries(Number(v));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground">entries</span>
            </div>
              
            {/* Search */}
            <div className="flex items-center">
              <Input
                placeholder="Search..."
                className="w-48"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-table-header hover:bg-table-header">
                  <TableHead className="font-semibold">Sr No</TableHead>

                  {columns.map((column, index) => (
                    <TableHead key={index} className="font-semibold">{column.header}</TableHead>
                  ))}

                  {actions && <TableHead className="font-semibold">Action</TableHead>}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2} className="text-center py-8 text-muted-foreground">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-muted/100">
                      <TableCell className="font-medium">
                        {(page - 1) * entries + rowIndex + 1}
                      </TableCell>

                      {columns.map((column, colIndex) => (
                        <TableCell key={colIndex}>
                          {column.cell ? column.cell(row[column.accessor], row) : row[column.accessor]}
                        </TableCell>
                      ))}

                      {actions && (
                    
                         <TableCell>
  <div className="flex items-center gap-2">
    {customActions ? (
      customActions(row)
    ) : (
      <>
        {/* Edit Button - Blue */}
        {onEdit && (
          <Button
            variant="default"
            size="icon"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-full"
            onClick={() => onEdit(row)}
          >
            <Edit size={18} />
          </Button>
        )}

        {/* Delete Button - Red Circle */}
        {onDelete && (
          <Button
            variant="default"
            size="icon"
            className="bg-red-600 text-white hover:bg-red-700 rounded-full"
            onClick={() => onDelete(row)}
          >
            <Trash2 size={18} />
          </Button>
        )}
      </>
    )}
  </div>


                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION */}
       
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">

{/* Showing entries text */}
<p className="text-sm text-muted-foreground whitespace-normal">
  Showing {(page - 1) * entries + 1} to{" "}
  {Math.min(page * entries, filteredData.length)} of {filteredData.length} entries
</p>

{/* Pagination */}
<div className="flex flex-wrap items-center gap-1 whitespace-normal">

  {/* Previous Button */}
  <Button
    variant="outline"
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className="whitespace-normal"
  >
    Prev
  </Button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
    <Button
      key={p}
      variant={page === p ? "default" : "outline"}
      className={`h-9 w-9 p-0 text-sm whitespace-normal ${
        page === p ? "bg-primary text-white" : ""
      }`}
      onClick={() => setPage(p)}
    >
      {p}
    </Button>
  ))}

  {/* Next Button */}
  <Button
    variant="outline"
    disabled={page === totalPages || totalPages === 0}
    onClick={() => setPage((p) => p + 1)}
    className="whitespace-normal"
  >
    Next
  </Button>

</div>
</div>





        </CardContent>
      </Card>
    </div>
  );
};
