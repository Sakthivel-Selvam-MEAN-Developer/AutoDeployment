import PropTypes from "prop-types";
import TextInput from "../form/TextInput.tsx";

const Address = ({control}: any)=> {
    return <>
        <div>
            <div style={{margin: "10px"}}> Address </div>
            <div style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap',
            }}>
                <TextInput
                    control={control}
                    label="Line 1"
                    fieldName={`line1`}
                />
                <TextInput
                    control={control}
                    label="Line 2"
                    fieldName={`line2`}
                />
                <TextInput
                    control={control}
                    label="Line 3"
                    fieldName={`line3`}
                />
                <TextInput
                    control={control}
                    label="City"
                    fieldName={`city`}
                />
                <TextInput
                    control={control}
                    label="State"
                    fieldName={`state`}
                />
                <TextInput
                    control={control}
                    label="Pin Code"
                    fieldName={`pincode`}
                />
            </div>
        </div>

    </>
}

Address.propTypes = {
    control : PropTypes.object,
    parent: PropTypes.string
}
export default Address
