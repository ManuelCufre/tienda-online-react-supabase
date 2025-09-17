import { Box, Text, Flex, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      minWidth={"full"}
      paddingY={3.5}
      paddingX={8}
      bg="#F2F2F2"
      _dark={{ bg: "#000000" }}
      mt="auto"
      height={20}
      className="relative flex justify-center"
     
    >
      <Flex
        align="center"
        justify="space-between"
        width={"70%"}
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Text fontSize="sm">
          © {new Date().getFullYear()} Tienda Online.
        </Text>
        <Flex gap={4}>
          <Link href="https://github.com/" isExternal>
            <Icon as={FaGithub} boxSize={5} />
          </Link>
          <Link href="https://instagram.com/" isExternal>
            <Icon as={FaInstagram} boxSize={5} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
