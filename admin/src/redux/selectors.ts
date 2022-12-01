// import { ECertificatesStatuses } from '../enums';
// import { RootState } from './store';
// import {
//     IAssortmentSelector,
//     ICertificateState,
//     IAssortmentsState,
//     ICertificate,
//     ICertificatesState,
//     ICertificateParams
// } from '../interfaces';
// import { useParams } from 'react-router-dom';
// import { INotificationState } from '../../Common/components/NotificationModal';

// export const notificationSelector = ({ certificates: state }: RootState): INotificationState => state.notification;

// export const uploadingSelector = ({ certificates: state }: RootState): boolean =>
//     state.isUploading || state.isUploading;

// export const assortmentsSelector = ({ certificates: state }: RootState): IAssortmentsState => state.assortments;

// export const certificatesSelector = ({ certificates: state }: RootState): ICertificatesState => state.certificates;

// export const certificateSelector = ({ certificates: state }: RootState): ICertificateState => state.certificate;

// export const certificateItemsSelector = ({ certificates: state }: RootState): ICertificate[] => {
//     const { status }: ICertificateParams = useParams();
//     const { certificates } = state.certificates;

//     if (status === ECertificatesStatuses.EXPIRING) return certificates.filter(({ isExpiring }) => !!isExpiring);
//     return certificates.filter(certificate => certificate.status === status);
// };

// export const certificateAssortmentsSelector = ({ certificates: state }: RootState): IAssortmentSelector => {
//     const { status }: ICertificateParams = useParams();

//     if (status === ECertificatesStatuses.DATA) {
//         return state.assortments;
//     }
//     if (status === ECertificatesStatuses.REJECTED) {
//         return state.rejectedAssortments;
//     }
//     if (status === ECertificatesStatuses.EXPIRING) {
//         return state.expiringAssortments;
//     }

//     return state.certificate;
// };

// export const isLoadingSelector = ({ certificates }: RootState) =>
//     certificates.assortments.isLoading ||
//     certificates.expiringAssortments.isLoading ||
//     certificates.rejectedAssortments.isLoading ||
//     certificates.certificates.isLoading ||
//     certificates.isDownloading ||
//     certificates.isUploading ||
//     certificates.certificate.isLoading;

export default {};
