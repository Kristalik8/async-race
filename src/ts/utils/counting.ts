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

const carID = {
    _id: -1,

    get getId() {
        return this._id;
    },
    set setId(value: number) {
        this._id = value;
    }
};

export {carID, page, counterMaxPage}
