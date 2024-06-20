import CustomInvoice from './invoiceFormat/CustomInvoice/customInvoice'
import ChettinadAriyalur from './invoiceFormat/Chettinad/chettinadAriyalur'
import ChettinadKarikkali from './invoiceFormat/Chettinad/chettinadKarikali'
import DalmiaDalmiapuramInvoice from './invoiceFormat/Dalmia/dalmiaDalmiapuram'
import DalmiaKadappaInvoice from './invoiceFormat/Dalmia/dalmiaKadapa'
import MahaInvoice from './invoiceFormat/Maha/mahaInvoice'
import { companyAddresses } from './invoiceFormat/CustomInvoice/CompanyAddress'

type CompanyConfig = {
    component: React.ComponentType<any>
    address?: any
    companyTagID: string
    annexureTagID?: string
}
export const companyConfig: Record<string, CompanyConfig> = {
    'ULTRATECH CEMENT LIMITED,TADIPATRI': {
        component: CustomInvoice,
        address: companyAddresses.ultraTech,
        companyTagID: 'ultratech_main'
    },
    'Chettinad Cement Corporation Private Ltd,Karikkali': {
        component: ChettinadKarikkali,
        companyTagID: 'chettinad-karikali-section',
        annexureTagID: 'chettinad_annexure_main'
    },
    'Chettinad Cement Corporation Private Ltd. Ariyalur': {
        component: ChettinadAriyalur,
        companyTagID: 'chettinad-ariyalur-section',
        annexureTagID: 'chettinad_annexure_main'
    },
    'Dalmia Cement (Bharat) Limited,Jammalmadugu': {
        component: DalmiaKadappaInvoice,
        companyTagID: 'dalmia_kadappa_section',
        annexureTagID: 'dalmia_annexure_section'
    },
    'Dalmia Cement (Bharat) Limited,Dalmapuram': {
        component: DalmiaDalmiapuramInvoice,
        companyTagID: 'dalmia_dalmiapuram_section',
        annexureTagID: 'dalmia_annexure_section'
    },
    'Sree Jayajothi Cement Private Limited (Maha Cement)': {
        component: MahaInvoice,
        companyTagID: 'maha-section',
        annexureTagID: 'Maha_annexure_section'
    },
    'Grasim Industries Limited,': {
        component: CustomInvoice,
        address: companyAddresses.grasim,
        companyTagID: 'ultratech_main'
    },
    'ASHTECH(INDIA) PRIVATE LIMITED': {
        component: CustomInvoice,
        address: companyAddresses.ashTech,
        companyTagID: 'ultratech_main'
    },
    'AVD Bricks INC': {
        component: CustomInvoice,
        address: companyAddresses.avdBricksInc,
        companyTagID: 'ultratech_main'
    },
    'Bharathi Cement Corporation Pvt. Ltd': {
        component: CustomInvoice,
        address: companyAddresses.bharathiCement,
        companyTagID: 'ultratech_main'
    },
    'THE INDIA CEMENT LIMITED': {
        component: CustomInvoice,
        address: companyAddresses.theIndiaCement,
        companyTagID: 'ultratech_main'
    },
    'KRS PROJECT LLP': {
        component: CustomInvoice,
        address: companyAddresses.krsProjectLLP,
        companyTagID: 'ultratech_main'
    },
    'PRIME LOGISTICS': {
        component: CustomInvoice,
        address: companyAddresses.primeLogistics,
        companyTagID: 'ultratech_main'
    },
    'R.K.S TRANSPORTS': {
        component: CustomInvoice,
        address: companyAddresses.rksTransports,
        companyTagID: 'ultratech_main'
    },
    'R V N TRANSPORTS': {
        component: CustomInvoice,
        address: companyAddresses.rvnTransports,
        companyTagID: 'ultratech_main'
    },
    'SMART TRADINGS': {
        component: CustomInvoice,
        address: companyAddresses.smartTradings,
        companyTagID: 'ultratech_main'
    },
    'MIOR slags': {
        component: CustomInvoice,
        address: companyAddresses.miorSlags,
        companyTagID: 'ultratech_main'
    },
    'Karls Infracon': {
        component: CustomInvoice,
        address: companyAddresses.karlsInfracon,
        companyTagID: 'ultratech_main'
    },
    'Horizon Services': {
        component: CustomInvoice,
        address: companyAddresses.horizonServices,
        companyTagID: 'ultratech_main'
    },
    'KPR Transports': {
        component: CustomInvoice,
        address: companyAddresses.kprTransports,
        companyTagID: 'ultratech_main'
    },
    'PEGADO FIXING SOLUTIONS PRIVATE LIMITED': {
        component: CustomInvoice,
        address: companyAddresses.pegaDoFixingSolutions,
        companyTagID: 'ultratech_main'
    }
}
export type Company = keyof typeof companyConfig
