import React, {ReactElement} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ApprovalPage: React.FC = (): ReactElement => {
    const navigate = useNavigate()

    return (
        <>
            <IconButton onClick={() => navigate(-1)}>
                <KeyboardBackspaceIcon/>
            </IconButton>
            <div style={{marginBottom: "30px"}}>Approval List</div>
            <Outlet/>
        </>
    );
};

export default ApprovalPage;