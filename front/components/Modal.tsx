import React, { ReactElement } from "react"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

export default class ModalComponent extends React.Component
	<{
		size?: string,
		title?: string, 
		isOpen: boolean,
		body?: ReactElement,
		footer?: ReactElement,
		onClose(): void
	}, any>{

	private _isOpen = false;
	private _isClose = false;

	getOpen() {
		return this._isOpen
	}
	
	setOpen(value: boolean) {
		this._isOpen = value
	}
	
	getClose() {
		return this._isClose
	}
	
	setClose(value: boolean) {
		this._isClose = value
	}

	close = (): void => {
		// this.setOpen(false)
		// this.setClose(true)
		this.setState({})
		this.props.onClose()
	}

	render() {
		return (
			<Modal isOpen={this.props.isOpen} onClose={this.props.onClose} size={this.props.size}>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>{this.props.title}</ModalHeader>
					<ModalCloseButton/>
					<ModalBody>
						{this.props.body}
					</ModalBody>

					<ModalFooter>
						{this.props.footer}
					</ModalFooter>
				</ModalContent>
			</Modal>
		)
	}
}