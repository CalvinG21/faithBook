import { configureStore } from "@reduxjs/toolkit";

import bibleVerseUpdateReducer from "./bibleVerseUpdateStore";
import testsAndPrayerReqsReducer from "./bibleVerseUpdateStore";
// The configureStore function will automatically set up an empty store for you
// with the relevant settings you will need in the future.
export const store = configureStore({
    reducer: {
        bibleChap:bibleVerseUpdateReducer,
        testAndPrayerReqs:testsAndPrayerReqsReducer
    },
});
