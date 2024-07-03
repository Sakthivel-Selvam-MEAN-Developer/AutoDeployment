import ChettinadAriyalur from './Chettinad/chettinadAriyalur.tsx'
import ChettinadKarikkali from './Chettinad/chettinadKarikali.tsx'
import CustomInvoice, { AddressDetails, InvoiceProps } from './CustomInvoice/customInvoice.tsx'
import DalmiaDalmiapuramInvoice from './Dalmia/dalmiaDalmiapuram.tsx'
import DalmiaKadappaInvoice from './Dalmia/dalmiaKadapa.tsx'
import MahaInvoice from './Maha/mahaInvoice.tsx'
import { AnnexureProps } from './type.tsx'

type CompanyConfig = {
    Component: React.FC<InvoiceProps> | React.FC<AnnexureProps>
    address?: AddressDetails
    companyTagID: string
    annexureTagID?: string
}
export const companyConfig: Record<string, CompanyConfig> = {
    'ULTRATECH CEMENT LIMITED,TADIPATRI': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'Chettinad Cement Corporation Private Ltd,Karikkali': {
        Component: ChettinadKarikkali,
        companyTagID: 'chettinad-karikali-section',
        annexureTagID: 'chettinad_annexure_main'
    },
    'Chettinad Cement Corporation Private Ltd. Ariyalur': {
        Component: ChettinadAriyalur,
        companyTagID: 'chettinad-ariyalur-section',
        annexureTagID: 'chettinad_annexure_main'
    },
    'Dalmia Cement (Bharat) Limited,Jammalmadugu': {
        Component: DalmiaKadappaInvoice,
        companyTagID: 'dalmia_kadappa_section',
        annexureTagID: 'dalmia_annexure_section'
    },
    'Dalmia Cement (Bharat) Limited,Dalmapuram': {
        Component: DalmiaDalmiapuramInvoice,
        companyTagID: 'dalmia_dalmiapuram_section',
        annexureTagID: 'dalmia_annexure_section'
    },
    'Sree Jayajothi Cement Private Limited (Maha Cement)': {
        Component: MahaInvoice,
        companyTagID: 'maha-section',
        annexureTagID: 'Maha_annexure_section'
    },
    'Grasim Industries Limited,': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'ASHTECH(INDIA) PRIVATE LIMITED': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'AVD Bricks INC': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'Bharathi Cement Corporation Pvt. Ltd': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'THE INDIA CEMENT LIMITED': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'KRS PROJECT LLP': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'PRIME LOGISTICS': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'R.K.S TRANSPORTS': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'R V N TRANSPORTS': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'SMART TRADINGS': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'MIOR slags': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'Karls Infracon': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'Horizon Services': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'KPR Transports': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    },
    'PEGADO FIXING SOLUTIONS PRIVATE LIMITED': {
        Component: CustomInvoice,
        companyTagID: 'ultratech_main'
    }
}
export type Company = keyof typeof companyConfig
