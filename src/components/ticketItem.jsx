import React from "react";

const TicketItem = ({ ticket }) => {
	const { price, departure, arrival, flight_duration_hours, transfers } = ticket;
	// const { departure } = ticket;
	return (
		<div className="ticket">

			<h3>Цена: {price}</h3>
			<div className="ticket-info">
				<div>Отправление: {departure}</div>
				<div>Прибытие: {arrival}</div>
				<div>Время полета: {flight_duration_hours} часов </div>
				<div>Количество пересалок: {transfers}</div>
			</div>

		</div>
	)

};

export default TicketItem