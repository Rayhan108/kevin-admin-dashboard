import { useFieldArray, useForm } from "react-hook-form";
import { useCreateCatMutation } from "../../redux/feature/others/othersApi";
import { message } from "antd";


const AddCategory = ({handleCancel,refetch}) => {
    const [createCat]=useCreateCatMutation()
      const { control, register, handleSubmit } = useForm();
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: "subCategory",
      });
    
      const onSubmit = async(data) => {
    
        const formattedData = {
          category: data.category,
          subCategory: data.subCategory.map((s) => s.name),
        };
      try {
      const res = await createCat(formattedData).unwrap()

      console.log("response------->",res);
      if(res?.success){
        message.success(res?.message)
        refetch()
  handleCancel()
      }else{
        message.error(res?.message)
handleCancel()
      }
    } catch (error) {
      console.log("login error",error)
         message.error(error?.data?.message)
         handleCancel()

    }
        console.log("Form Data:", formattedData);
      };
    return (
        <div>
               <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 rounded-lg border"
    >
      {/* Category  */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          For Category{" "}
     
        </label>
        <div className="flex items-center border border-gray-300 rounded-md mt-2">
          <input
            type="text"
            {...register("category")}
    
            className="w-full p-2 text-sm border-none focus:outline-none bg-gray-100"
          />
        </div>
      </div>

      {/* Sub Category List */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Sub Categories
        </label>

        <div className="space-y-2 mt-2">
          {fields?.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                type="text"
                {...register(`subCategory.${index}.name`)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm font-medium"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add new subcategory */}
        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="mt-2 text-sm text-blue-600 font-medium"
        >
          + Add Subcategory
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex w-full space-x-4">
        <button
          type="button"
          onClick={() => console.log("Canceled")}
          className="text-gray-600 hover:text-gray-800 font-semibold w-1/2 border rounded-md border-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-700 w-1/2"
        >
          Save
        </button>
      </div>
    </form>
        </div>
    );
};

export default AddCategory;