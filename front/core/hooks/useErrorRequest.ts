import useAlert from './useAlert';
import { AxiosError } from 'axios';
import { Message } from '../Messages';

const useAlertRequest = () => {
	const alert = useAlert()
	
	const errorRequest = (err: AxiosError) => {
		console.log(err);
		return alert('error', Message.REQUEST_ERROR_STATUS.replace('{status}', err.response?.status.toString() ?? ''))
	}
	return errorRequest
}

export default useAlertRequest