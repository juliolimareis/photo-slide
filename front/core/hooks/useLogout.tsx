import Router from 'next/router'

const useLogout = () => {

	const logout = async (): Promise<void> => {
		await localStorage.removeItem('token-api')
		Router.replace('/')
	}
	
	return logout
}

export default useLogout