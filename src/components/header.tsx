import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
}

function Header({ title, children }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 pt-12 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-white text-xl font-heading mt-2">{title}</Text>
      </View>
      {children}
    </View>
  )
}

function HeaderCartButton({ cartQuantityItems = 0 }) {
  return (
    <Link href={'/cart'} asChild>
      <TouchableOpacity className="relative" activeOpacity={0.7}>
        {cartQuantityItems > 0 && (
          <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center absolute -top-1.5 z-10 -right-1.5">
            <Text className="text-slate-900 font-bold text-xs">
              {cartQuantityItems}
            </Text>
          </View>
        )}

        <Feather name="shopping-bag" color={colors.white} size={24} />
      </TouchableOpacity>
    </Link>
  )
}

Header.CartButton = HeaderCartButton

export { Header }