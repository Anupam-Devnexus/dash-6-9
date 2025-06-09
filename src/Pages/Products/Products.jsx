import React, { useState } from "react";
import Brick from "../../DataStore/Brick.json";
import Tiles from "../../DataStore/Tiles.json";
import { AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai";
import Confirm from "../../Components/PopUp/Confirm";
import { useNavigate } from "react-router-dom";
import EditProduct from "../EditProduct/EditProduct";

export default function Products() {
    const [productType, setProductType] = useState("Brick");
    const [products, setProducts] = useState(Brick);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate()
    // adding stack to delete the product
    const [productToDelete, setProductToDelete] = useState(null);
    const handleProductChange = (e) => {
        const selected = e.target.value;
        setProductType(selected);
        setProducts(selected === "Tiles" ? Tiles : Brick);
    };

    const deleteHandler = (index) => {
        setProductToDelete(index);
        setShowConfirm(true);
    };
    const handleConfirmDelete = () => {
        const updatedProducts = [...products];
        updatedProducts.splice(productToDelete, 1);
        setProducts(updatedProducts);
        setShowConfirm(false);
        setProductToDelete(null);
    };

    // edithandler

   const edithandler = (index) => {
  const product = products[index];
  navigate(`/admin/edit/${product.productType.toLowerCase()}/${product.title}`, { state: { product } });
};
    
    return (
        <>
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between p-2 bg-[var(--var-red-col)] text-white shadow-sm space-y-2 sm:space-y-0">
                <span className="font-semibold text-lg">Select Your Product</span>
                <div className="relative flex gap-2">
                    <button
                    onClick={()=> navigate('/admin/product/addProduct')}
                    className="bg-white text-[var(--var-red-col)] px-3 py-1 rounded-md cursor-pointer">Add Product</button>
                    <select
                        value={productType}
                        onChange={handleProductChange}
                        className="appearance-none w-32 sm:w-48 bg-white text-[var(--var-red-col)] font-medium border border-gray-200 rounded-md py-1 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--var-red-col)]"
                    >
                        <option value="Brick">Bricks</option>
                        <option value="Tiles">Tiles</option>
                    </select>

                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[var(--var-red-col)]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path fillRule="evenodd" d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>


            <div className="max-h-screen w-full">
                <div className="overflow-x-auto shadow-md rounded">
                    <table className="min-w-full bg-[white] text-sm text-left text-gray-700">
                        <thead className=" text-[var(--var-red-col)] border-b-[1px] sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-2">#</th>
                                <th className="px-6 py-2">Title</th>
                                <th className="px-6 py-2">Shape</th>
                                <th className="px-6 py-2">Type</th>
                                <th className="px-6 py-2">Color</th>
                                <th className="px-6 py-2">Size</th>
                                <th className="px-6 py-2">Supply Ability</th>

                                <th className="px-6 py-2">Image</th>
                                <th className="px-6 py-2"> Status </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 overflow-y-auto max-h-[60vh]">
                            {products.map((tile, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="px-3 py-1 font-medium">{index + 1}</td>
                                    <td className="px-3 py-1">{tile.title}</td>
                                    <td className="px-3 py-1">{tile.shape}</td>
                                    <td className="px-3 py-1">{tile.productType}</td>
                                    <td className="px-3 py-1">{tile.color}</td>
                                    <td className="px-3 py-1">{tile.size}</td>
                                    <td className="px-3 py-1">{tile.supplyAbility}</td>

                                    <td className="px-3 py-1">
                                        <img
                                            src={tile.productImage}
                                            alt={tile.title}
                                            className="w-20 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-5">
                                        <span
                                            className="cursor-pointer text-lg"
                                            onClick={() => edithandler(index)}
                                        >
                                            <AiTwotoneEdit />
                                        </span>

                                        <span className="cursor-pointer text-lg text-[var(--var-red-col)]"
                                            onClick={() => deleteHandler(index)}
                                        >
                                            <AiOutlineDelete />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Confirm
                isOpen={showConfirm}
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setShowConfirm(false);
                    setProductToDelete(null);
                }}
            />
        </>
    );
}
