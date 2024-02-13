import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

import { CATEGORIES, MENU } from '@/utils/data/products'

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { Product } from '@/components/product'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'

export default function Home() {
  const cartStore = useCartStore()
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value)

    const sectionIndex = CATEGORIES.findIndex(category => category === value)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
  }

  return (
    <View className='flex-1'>
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

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

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Text className="text-xl text-white font-heading mt-8 mb-3">
              {title}
            </Text>
          )
        }}
        renderItem={({ item }) => {
          return (
            <Link href={`/product/${item.id}`} asChild>
              <Product data={item} />
            </Link>
          )
        }}
        className="flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}