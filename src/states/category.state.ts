import { atom, selector } from "recoil";
import { menuByStoreState } from "./menu.state";
import { Category, CategoryType } from "types/store-menu";


export const currentCateState = selector({
  key: "category",
  get: async ({ get }) => {
    const menu = get(menuByStoreState);
    const cateId = get(selectedCategoryIdState);
    const currentCate = menu.categories.find((cate) => cate.id === cateId);
    if (currentCate !== undefined) {
      return currentCate;
    }
    return null;
  },
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: async ({ get }) => {
    const menu = get(menuByStoreState);
    return menu.categories.filter((cate) => cate.type === CategoryType.NORMAL);
  },
});

export const childCategoriesState = selector<Category[]>({
  key: "childCategories",
  get: async ({ get }) => {
    const menu = get(menuByStoreState);
    const cateId = get(selectedCategoryIdState);
    const selectedCategory = menu.categories.find((cate) => cate.id === cateId);
    const listChild = menu.categories.filter(
      (cate) => cate.type === CategoryType.CHILD
    );
    console.log("select category id ", cateId);
    console.log("select category ", selectedCategory);
    console.log("list category child", listChild);
    if (selectedCategory?.childCategoryIds === [] || listChild == null) {
      return [];
    }
    const listChildofParentCate: Category[] = [];
    listChild.forEach((e) => {
      if (selectedCategory?.childCategoryIds.some((id) => id === e.id)) {
        listChildofParentCate.push(e);
      }
    });
    return listChildofParentCate.sort(
      (a, b) => b.displayOrder - a.displayOrder
    );
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});


