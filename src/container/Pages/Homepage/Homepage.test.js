import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import SHomepage from "./Homepage";
import classes from "./Homepage.module.scss";

describe("SHomepage", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<SHomepage />);
    });

    afterEach(cleanup);

    describe("", () => {
      test("", () => {});
    });
  });
});
