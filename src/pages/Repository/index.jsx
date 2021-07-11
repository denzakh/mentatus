import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	createNewStatus,
	deleteStatus,
	openStatus,
	closeStatus
} from "../../actions/repository";
import { setPage } from "../../actions/general";
import SaveAndLoad from "../../components/SaveAndLoad";
import Button from "../../components/Button";
import "./style.css";

class Repository extends Component {
	handlerCreateNewStatus = () => {
		this.props.createNewStatus();
		this.props.setPage("Status");
	};

	handlerOpenStatus = (id, e) => {
		this.props.openStatus(id);
		this.props.setPage("Status");
	};

	handlerDeleteStatus = (id, e) => {
		this.props.deleteStatus(id);
	};

	showDelite = psystatusRow => {
		if (this.props.repository.length > 1) {
			return (
				<button
					type="button"
					onClick={e => this.handlerDeleteStatus(psystatusRow.id, e)}
				>
					Удалить
				</button>
			);
		}
	};

	render() {
		return (
			<div className="repository">
				<h1>Заключения</h1>
				<div className="repository__panel">
					<Button onClick={this.handlerCreateNewStatus}>Новый осмотр</Button>
					<SaveAndLoad />
				</div>
				<hr />
				<table className="repository__table" width="500px" border="1px">
					<tbody>
						<tr className="repository__row">
							<th>id</th>
							<th>дата</th>
							<th>пол</th>
							<th>возраст</th>
							<th>кнопки</th>
						</tr>
						{this.props.repository.map(psystatusRow => {
							return (
								<tr className="repository__row" key={psystatusRow.id}>
									<td>
										<button
											type="button"
											onClick={e => this.handlerOpenStatus(psystatusRow.id, e)}
										>
											<b>{psystatusRow.id}</b>
										</button>
										{psystatusRow.isOpen ? " открыт" : ""}
									</td>
									<td>{psystatusRow.dataOsmotra.text}</td>
									<td>{psystatusRow.pol.isChecked ? "мужской" : "женский"}</td>
									<td>{psystatusRow.vozrast.text}</td>
									<td>{this.showDelite(psystatusRow)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		repository: state.repository
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createNewStatus: bindActionCreators(createNewStatus, dispatch),
		deleteStatus: bindActionCreators(deleteStatus, dispatch),
		openStatus: bindActionCreators(openStatus, dispatch),
		closeStatus: bindActionCreators(closeStatus, dispatch),
		setPage: bindActionCreators(setPage, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
