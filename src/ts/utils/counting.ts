import {getPages} from "../api/api";


function counterMaxPage() {
    let maxPage:number = 1;

    return async () => {
        maxPage = await getPages();
        return maxPage;
    };

}

const page = {
    _page: 1,

    get number() {
        return this._page;
    },
    set number(value: number) {
        this._page = value;
    }
};

const index = {
    _index: -1,

    get current() {
        return this._index;
    },
    set current(value: number) {
        this._index = value;
    }
};

export {page, counterMaxPage, index}