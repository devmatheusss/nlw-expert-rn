import { FlatList, View } from 'react-native'

import { CATEGORIES } from '@/utils/data/products'

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { useState } from 'react'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value)
  }

  return (
    <View className='flex-1'>
      <Header title="Faça seu pedido" cartQuantityItems={5} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <CategoryButton
              title={item}
              isSelected={item === selectedCategory}
              onPress={() => handleSelectCategory(item)}
            />
          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='max-h-10 mt-5'
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
    </View>
  )
}