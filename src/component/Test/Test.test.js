import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Test from "./Test";


describe("Test", () => {

    let _render = null;

    beforeEach(() => {
        
        console.log = jest.fn();
        window.IntersectionObserver =  class IntersectionObserver {
            constructor() {}
          
            observe() {
              return null;
            }
          
            unobserve() {
              return null;
            }
        };
        _render = render(<Test />);
    
    });

    afterEach(cleanup)

    describe("Does ref change with rerender", () => {

        test("How objects compare", () => {

            const clickBtn = _render.getByText('Click');
            const p = document.querySelector('p');

            const observer = new window.IntersectionObserver();

            expect(observer.observe()).toEqual(null);

            console.log(`HEIGHT ${document.documentElement.clientHeight}`);

            expect(p.innerHTML).toEqual("1");

            expect(console.log).toHaveBeenNthCalledWith(1, "Test render");

            fireEvent.click(clickBtn);

            expect(p.innerHTML).toEqual("2");

        })    

    })
});