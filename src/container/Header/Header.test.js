import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import SHeader from "./Header";
import classes from "./Header.module.scss";

describe("SHeader", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<SHeader />);
    });

    afterEach(cleanup);

    describe("", () => {
      test("", () => {});
    });
  });
});
