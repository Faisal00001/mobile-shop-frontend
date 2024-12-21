import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import Swal from "sweetalert2";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [allUsers, loading, refetch] = useGetAllUsers()
    if (loading) {
        return <Loader></Loader>
    }
    const handleDeleteUser = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosSecure.delete(`/users/admin/${id}`)
                        if (response.data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        } else {
                            // Handle case where no items were deleted or error occurred
                            console.error("No item deleted or an error occurred.");
                            alert("Failed to delete item.");
                        }
                    } catch (error) {
                        console.log(error)
                    }

                }
            });
        } catch (error) {
            console.log(error)
        }
    }
    const handleMakeSeller = async (id) => {
        try {
            const response = await axiosSecure.patch(`/users/admin/${id}`)
            if (response.data.modifiedCount > 0) {
                toast.success('Status Updated Successfully')
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

            <h3 className="text-3xl font-bold mt-10 mb-10">Manage Users</h3>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers?.map((user, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user?.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user?.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.role}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleMakeSeller(user._id)} className="btn bg-green-500 hover:bg-green-500 text-white">Make Seller</button>
                                        <button onClick={() => handleDeleteUser(user._id)} className="btn bg-red-500 hover:bg-red-500 text-white">Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default ManageUsers;