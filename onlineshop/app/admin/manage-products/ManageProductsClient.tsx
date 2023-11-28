"use client";
import { Image, Product, Review } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseapp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseapp);
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        image: product.image,
      };
    });
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id, params.row.image)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => router.push(`/admin/product/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put("/api/product", { id, inStock: !inStock })
        .then((res) => {
          toast.success("Product status changed");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Ooops! Something went wrong");
          console.log(error);
        });
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: string, image: any[]) => {
      toast("Deleting product, please wait!");

      const handleImageDelete = async () => {
        try {
          for (const item of image) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
            }
          }
        } catch (error) {
          return console.log("Error deleting image", error);
        }
      };

      await handleImageDelete();

      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          toast.success("Product deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Ooops! Something went wrong");
          console.log(error);
        });
    },
    [router, storage]
  );

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products" center />
      </div>
      <DataGrid
        style={{ height: 600, width: "100%" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[9, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ManageProductsClient;
