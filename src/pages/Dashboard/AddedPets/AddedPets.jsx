import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMemo, useState } from "react";
import {
    useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import './AddedPets.css';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const AddedPets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // get pet data
    const { data: pets = [], refetch } = useQuery({
        queryKey: ['pets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/${user.email}`)
            return res.data
        }
    })
    console.log(pets)

    const handleDelete = id => {
        console.log('Delete', id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/deletePet/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Pet has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleSetAdopted = id => {
        console.log('Handle Adopted', id)
        axiosSecure.patch(`/pets/${id}`, {adopted: true})
        .then(res => {
            refetch()
            console.log(res.data)
        })
    }

    // colums
    const columns = useMemo(() => [
        {
            accessorKey: 'serialNumber',
            header: 'Serial Number',
            cell: info => info.row.index + 1,
        },
        {
            accessorKey: 'pet_name',
            header: 'Pet Name',
        },
        {
            accessorKey: 'pet_category',
            header: 'Pet Category',
        },
        {
            accessorKey: 'pet_image',
            header: 'Pet Image',
            cell: info => <img src={info.getValue()} alt="pet" style={{ width: 50, height: 50 }} />,
        },
        {
            accessorKey: 'adopted',
            header: 'Adoption Status',
            cell: info => info.getValue() ? 'Adopted' : 'Not Adopted',
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div>
                    <Link to={`/dashboard/updatePet/${row.original._id}`}><button className="mr-2">Update</button></Link>
                    <button className="mr-2" onClick={() => handleDelete(row.original._id)}>Delete</button>
                    <button className="mr-2" onClick={() => handleSetAdopted(row.original._id)}>Adoption</button>
                </div>
            ),
        },
    ], [])


    const data = useMemo(() => pets, [pets])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil(pets.length / pagination.pageSize),
    });


    return (
        <div className="mt-28">
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                    }[header.column.getIsSorted()] ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pets.length > 10 && (
                <div className="text-center mt-5 text-2xl">
                    <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default AddedPets;