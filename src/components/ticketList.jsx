import React, { useState, useEffect } from 'react';
import { tickets as initialTickets } from '../data/data'; // Сохраняем изначальные билеты
import TicketItem from './ticketItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const TicketList = () => {
	const [sortedTickets, setSortedTickets] = useState(initialTickets);
	const [sortBy, setSortBy] = useState(null);
	const [transfersFilter, setTransfersFilter] = useState({ 'No transfers': false, '1 transfer': false, '2 transfers': false });

	const handleTransfersFilter = (event) => {
		const name = event.target.name;
		const checked = event.target.checked;

		// Устанавливаем состояние выбранного фильтра
		setTransfersFilter({ [name]: checked });
	};

	const sortByPrice = () => {
		//создание массива sorted, т.к sort изменяет массив на месте
		const sorted = [...sortedTickets].sort((a, b) => a.price - b.price);
		setSortedTickets(sorted);
		setSortBy('price');
	}

	const sortInitialOrder = () => {
		setSortedTickets(initialTickets);
		setSortBy(null);
	}

	const sortBySpeed = () => {
		const sorted = [...sortedTickets].sort((a, b) => a.flight_duration_hours - b.flight_duration_hours)
		setSortedTickets(sorted);
		setSortBy('speed')
	}

	const applyFilters = () => {
		let filteredTickets = initialTickets;

		if (transfersFilter['No transfers']) {
			filteredTickets = filteredTickets.filter(ticket => ticket.transfers === 0);
		}

		if (transfersFilter['1 transfer']) {
			filteredTickets = filteredTickets.filter(ticket => ticket.transfers === 1);
		}

		if (transfersFilter['2 transfers']) {
			filteredTickets = filteredTickets.filter(ticket => ticket.transfers === 2);
		}

		setSortedTickets(filteredTickets);
	};
	useEffect(() => {
		if (sortBy === null) {
			sortInitialOrder();
		}
	}, [sortBy]);


	return (
		<div className='container'>
			<div className='filter'>

				<FormControlLabel
					control={<Checkbox checked={transfersFilter['No transfers']} onChange={handleTransfersFilter} name="No transfers" />}
					label="No transfers"
				/>
				<FormControlLabel
					control={<Checkbox checked={transfersFilter['1 transfer']} onChange={handleTransfersFilter} name="1 transfer" />}
					label="1 transfer"
				/>
				<FormControlLabel
					control={<Checkbox checked={transfersFilter['2 transfers']} onChange={handleTransfersFilter} name="2 transfers" />}
					label="2 transfers"
				/>
				<Button onClick={applyFilters}>Применить фильтр</Button>
			</div>
			<div className='buttons'>
				<Button onClick={sortByPrice}>Самый дешевый</Button>
				<Button onClick={sortInitialOrder}>Исходный порядок</Button>
				<Button onClick={sortBySpeed}>Самый быстрый</Button>
			</div>
			<div>
				{sortedTickets.map(ticket => (
					<TicketItem key={ticket.ID} ticket={ticket} />
				))}
			</div>
		</div>
	);
};

export default TicketList;
