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
import * as helper from "./Helper/Helper";


describe("Test", () => {

    let _render = null;

    beforeEach(() => {
        
        console.log = jest.fn();

        helper.getBodyClientHeight = jest.fn();
        helper.getBodyClientHeight.mockReturnValue(300);
        
        _render = render(<Test />);
    
    });

    afterEach(cleanup)

    describe("", () => {

        test("", () => {

            expect(console.log).toHaveBeenCalledTimes(3);
            //expect(console.log).toHaveBeenLastCalledWith("useEffect");
            expect(console.log).toHaveBeenNthCalledWith(1, "Test render");
            expect(console.log).toHaveBeenNthCalledWith(2, "useEffect");
            expect(console.log).toHaveBeenNthCalledWith(3, 300);
        })    

    })
});