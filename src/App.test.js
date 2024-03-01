import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock fetch
// beforeEach(() => {
// 	global.fetch = jest.fn(() =>
// 		Promise.resolve({
// 			json: () =>
// 				Promise.resolve([
// 					{ id: 12345678920, type: "USSAVING", balance: 5000.05 },
// 					{ id: 12345678924, type: "INVESTMENT", balance: 7000.1 },
// 				]),
// 		})
// 	);
// });

const DB = [
	{ id: 12345678920, type: "USSAVING", balance: 5000.05 },
	{ id: 12345678924, type: "INVESTMENT", balance: 7000.1 },
];

describe("Tests the app", () => {
	// Pre-script to mock the global fetch data
	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue(DB),
		});
	});

	test("items render correctly on screen", () => {
		const { getByText, getByRole } = render(<App />);
		expect(getByText(/Accounts/)).toBeInTheDocument();
	});

	test("fetches accounts and displays sum of balance", async () => {
		render(<App />);
		const sumElement = await screen.findByText("Sum of balance: 12000.15"); // 5000.05 + 7000.1 = 12000.15
		expect(sumElement).toBeInTheDocument();
	});

	// Reset mock after each test
	afterEach(() => {
		global.fetch.mockRestore();
	});
});
