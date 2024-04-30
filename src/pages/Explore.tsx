import Navbar from "@/components/NavBar";
import Post from "@/components/Post";

export default function Explore() {
  return (
    <>
     <div className="h-full w-full bg-white dark:bg-gray-950">
      <Navbar>
        <Navbar.NavbarAvatar src="https://avatars.githubusercontent.com/u/107909653?v=4" alt="Image" fallback="JL" />
        <Navbar.NavbarSearch />
        <Navbar.Actions />
      </Navbar>
      
      <div className="">
      
      <Post>
        <Post.Header username="libyzxy0" src="https://avatars.githubusercontent.com/u/107909653?v=4" />
        <Post.Caption title="Pinetree JavaScript" description="A simple code snippet for making pine tree in JavaScript." />
        <Post.CodeSnippet lang="javascript" code={`function drawPineTree(levels) {
    for (let i = 0; i < levels; i++) {
        let spaces = ' '.repeat(levels - i - 1);
        let stars = '*'.repeat(2 * i + 1);
        console.log(spaces + stars);
    }
    // Trunk
    let trunkSpaces = ' '.repeat(levels - 1);
    console.log(trunkSpaces + '*');
    console.log(trunkSpaces + '*');
}

drawPineTree(5);
`}/>
        <Post.Reaction />
      </Post>
      <Post>
        <Post.Header username="shoti" src="https://i.pinimg.com/736x/07/6c/b4/076cb4b97e60bb203233e0b619534662.jpg" />
        <Post.Caption title="Simple web server Express." description="Simple expressjs web server nodejs." />
        <Post.CodeSnippet lang="javascript" code={`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 3000;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
`}/>
        <Post.Reaction />
      </Post>
      <Post>
        <Post.Header username="shoti" src="https://i.pinimg.com/736x/07/6c/b4/076cb4b97e60bb203233e0b619534662.jpg" />
        <Post.Caption title="Palindrome Checker" description="This program prompts the user to input a string, then checks if it reads the same forward and backward, printing the result accordingly." />
        <Post.CodeSnippet lang="cpp" code={`#include <iostream>
#include <string>
#include <algorithm>

bool isPalindrome(const std::string& str) {
    std::string reversed = str;
    std::reverse(reversed.begin(), reversed.end());
    return str == reversed;
}

int main() {
    std::string input;
    std::cout << "Enter a string: ";
    std::cin >> input;

    if (isPalindrome(input)) {
        std::cout << input << " is a palindrome." << std::endl;
    } else {
        std::cout << input << " is not a palindrome." << std::endl;
    }

    return 0;
}
`}/>
        <Post.Reaction />
      </Post>
      
      </div>
      
     </div>
    </>
  )
}