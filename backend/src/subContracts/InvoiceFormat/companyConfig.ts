import ChettinadAriyalur from './Chettinad/chettinadAriyalur.tsx'
import ChettinadKarikkali from './Chettinad/chettinadKarikali.tsx'
import { AddressDetails, companyAddresses } from './CustomInvoice/CompanyAddress.ts'
import CustomInvoice, { InvoiceProps } from './CustomInvoice/customInvoice.tsx'
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
        address: companyAddresses.ultraTech,
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
        address: companyAddresses.grasim,
        companyTagID: 'ultratech_main'
    },
    'ASHTECH(INDIA) PRIVATE LIMITED': {
        Component: CustomInvoice,
        address: companyAddresses.ashTech,
        companyTagID: 'ultratech_main'
    },
    'AVD Bricks INC': {
        Component: CustomInvoice,
        address: companyAddresses.avdBricksInc,
        companyTagID: 'ultratech_main'
    },
    'Bharathi Cement Corporation Pvt. Ltd': {
        Component: CustomInvoice,
        address: companyAddresses.bharathiCement,
        companyTagID: 'ultratech_main'
    },
    'THE INDIA CEMENT LIMITED': {
        Component: CustomInvoice,
        address: companyAddresses.theIndiaCement,
        companyTagID: 'ultratech_main'
    },
    'KRS PROJECT LLP': {
        Component: CustomInvoice,
        address: companyAddresses.krsProjectLLP,
        companyTagID: 'ultratech_main'
    },
    'PRIME LOGISTICS': {
        Component: CustomInvoice,
        address: companyAddresses.primeLogistics,
        companyTagID: 'ultratech_main'
    },
    'R.K.S TRANSPORTS': {
        Component: CustomInvoice,
        address: companyAddresses.rksTransports,
        companyTagID: 'ultratech_main'
    },
    'R V N TRANSPORTS': {
        Component: CustomInvoice,
        address: companyAddresses.rvnTransports,
        companyTagID: 'ultratech_main'
    },
    'SMART TRADINGS': {
        Component: CustomInvoice,
        address: companyAddresses.smartTradings,
        companyTagID: 'ultratech_main'
    },
    'MIOR slags': {
        Component: CustomInvoice,
        address: companyAddresses.miorSlags,
        companyTagID: 'ultratech_main'
    },
    'Karls Infracon': {
        Component: CustomInvoice,
        address: companyAddresses.karlsInfracon,
        companyTagID: 'ultratech_main'
    },
    'Horizon Services': {
        Component: CustomInvoice,
        address: companyAddresses.horizonServices,
        companyTagID: 'ultratech_main'
    },
    'KPR Transports': {
        Component: CustomInvoice,
        address: companyAddresses.kprTransports,
        companyTagID: 'ultratech_main'
    },
    'PEGADO FIXING SOLUTIONS PRIVATE LIMITED': {
        Component: CustomInvoice,
        address: companyAddresses.pegaDoFixingSolutions,
        companyTagID: 'ultratech_main'
    }
}
export type Company = keyof typeof companyConfig
