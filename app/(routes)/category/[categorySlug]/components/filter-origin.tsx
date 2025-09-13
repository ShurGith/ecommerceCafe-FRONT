import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type FilterOriginProps = {
    setFilterOrigin: (productOrigin: string) => void
}

const FilterOrigin = (props: FilterOriginProps) => {
    const { setFilterOrigin } = props;
    const { result, loading }: FilterTypes = useGetProductField()
    console.log(result);

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Origen</p>
            {loading && result === null && (
                <p>Cargando origen...</p>
            )}

            <RadioGroup onValueChange={(value) => setFilterOrigin(value)}>
                {result !== null && result.schema.attributes.productOrigin.enum.map((productOrigin: string) => (
                    <div key={productOrigin} className="flex items-center space-x-2">
                        <RadioGroupItem value={productOrigin} id={productOrigin} />
                        <Label htmlFor={productOrigin}>{productOrigin}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default FilterOrigin;