import { render, screen, fireEvent } from '@testing-library/react';
import Employee_form from './Employee_form'; // Adjust the import based on your component's location
import * as Common from './Common'; // If you are using a Common utility for API calls

// Mock the Common.callApi function to prevent actual API calls during the test
jest.mock('./Common', () => ({
	callApi: jest.fn(),
}));

describe('Employee_form', () => {
	test('should show alert when mandatory fields are empty', () => {
		// Mock the global alert function
		global.alert = jest.fn();

		render(<Employee_form />); // Render the component

		// Get the submit button (assuming it has text 'Submit')
		const submitButton = screen.getByText(/submit/i);

		// Trigger a click on the button with empty fields
		fireEvent.click(submitButton);

		// Check if alert is called
		expect(global.alert).toHaveBeenCalledWith('Please fill mandatory fields.');
	});

	// test('should show alert if lname is empty but fname is filled', () => {
	// 	global.alert = jest.fn(); // Mock alert
	// 	render(<Employee_form />);

	// 	const fnameInput = screen.getByLabelText(/first name/i);
	// 	const lnameInput = screen.getByLabelText(/last name/i);
	// 	const submitButton = screen.getByText(/submit/i);

	// 	// Fill fname but leave lname empty
	// 	fireEvent.change(fnameInput, { target: { value: 'John' } });
	// 	fireEvent.change(lnameInput, { target: { value: '' } });

	// 	fireEvent.click(submitButton);

	// 	// Expect alert for lname
	// 	expect(global.alert).toHaveBeenCalledWith('Last name is mandatory if first name is provided.');
	// });


	test('should call the API when the fields are filled', () => {
		// Mock the API call to simulate a successful response
		Common.callApi.mockImplementation((url, params, callback) => {
			callback(JSON.stringify({ success: true }));
		});

		render(<Employee_form />);

		// Get input fields and button
		const fnameInput = screen.getByLabelText(/first name/i);
		const lnameInput = screen.getByLabelText(/last name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const submitButton = screen.getByText(/submit/i);

		// Simulate entering values into the input fields
		fireEvent.change(fnameInput, { target: { value: 'John' } });
		fireEvent.change(lnameInput, { target: { value: 'Doe' } });
		fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

		// Trigger the submit button click
		fireEvent.click(submitButton);

		// Check if Common.callApi was called with correct arguments
		expect(Common.callApi).toHaveBeenCalledWith(
			expect.any(String),
			['add', 'John', 'Doe', 'john.doe@example.com'],
			expect.any(Function)
		);
	});

	// test('should clear the input fields after successful submission', () => {
	//     // Mock the API call
	//     Common.callApi.mockImplementation((url, params, callback) => {
	//         callback(JSON.stringify({ success: true }));
	//     });

	//     render(<EmployeeForm />);

	//     const fnameInput = screen.getByLabelText(/first name/i);
	//     const lnameInput = screen.getByLabelText(/last name/i);
	//     const emailInput = screen.getByLabelText(/email/i);
	//     const submitButton = screen.getByText(/submit/i);

	//     // Simulate user input
	//     fireEvent.change(fnameInput, { target: { value: 'John' } });
	//     fireEvent.change(lnameInput, { target: { value: 'Doe' } });
	//     fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

	//     // Submit the form
	//     fireEvent.click(submitButton);

	//     // Check if the input fields are cleared
	//     expect(fnameInput.value).toBe('');
	//     expect(lnameInput.value).toBe('');
	//     expect(emailInput.value).toBe('');
	// });
});
