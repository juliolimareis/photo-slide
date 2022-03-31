import { AxiosError } from 'axios';
import { Message } from './Messages';
import { useToast } from "@chakra-ui/react"
import useAlert from './useAlert';

export const useAlertRequest = () => {
	const alert = useAlert()
	
	const errorRequest = (err: AxiosError) => (
		alert('error', Message.REQUEST_ERROR_STATUS.replace('{status}', err.response?.status.toString() ?? ''))
	)
	
	return errorRequest
}

export default useAlertRequest