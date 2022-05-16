import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppClass from './AppClass'




test("Renders without errors", () => {
  render(<AppClass />)
})

test("Renders coordinates and headings on screen", () => {
    render(<AppClass/>);

    const headerElement = screen.queryByText(/coordinates/i)

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/coordinates/i)
  })

   test("Render buttons to screenm", () => {
     render(<AppClass/>)
     const leftButton = screen.getByText(/left/i)
     const upButton = screen.getByText(/up/i)
     const rightButton = screen.getByText(/right/i)
     const downButton = screen.getByText(/down/i)
     const resetButton = screen.getByText(/reset/i)
     

     expect(leftButton).toBeTruthy()
     expect(upButton).toBeTruthy()
     expect(rightButton).toBeTruthy()
     expect(downButton).toBeTruthy()
     expect(resetButton).toBeTruthy()
     
   })

   test("Nav Links are displayed on screen", () => {
     render(<AppClass/>)
    const functionalAppLink = screen.queryByText(/Functional/i)
    const classAppLink = screen.queryByText(/Class-Based/i)
    

     
   })

   test("Typing in email input changes value", () => {
     render(<AppClass/>)
     const emailInput = screen.getByPlaceholderText("type email")
     fireEvent.change(emailInput, { target: {value: "test@test.com"}})

     expect(emailInput).toBeInTheDocument("test@test.com")
   })

   
 















