import React, { FC } from 'react';
import { Box, Text } from 'zmp-ui';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { selectedCategoryIdState, categoriesState } from 'states/category.state';
import { CategoriesSkeleton } from 'components/skeletons';

const CategoryItem: FC<{ category: any; onClick: (id: string) => void }> = ({ category, onClick }) => (
  <div onClick={() => onClick(category.id)} className="flex flex-col space-y-1 items-center">
    <img className="w-16 h-16" src={category.picUrl} alt={category.name} />
    <Text size="small" className="text-gray text-center">
      {category.name}
    </Text>
  </div>
);

export const Categories: FC = () => {
  const categoriesLoadable = useRecoilValueLoadable(categoriesState);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate('/category');
  };

  if(categoriesLoadable.state === 'loading' ||  categoriesLoadable.state === 'hasError') {
    return <CategoriesSkeleton />;
  }
  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4">
      {categoriesLoadable.contents.map((category, i) => (
        <CategoryItem key={i} category={category} onClick={gotoCategory} />
      ))}
    </Box>
  );
};

