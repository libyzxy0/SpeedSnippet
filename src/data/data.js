const posts = [
  {
    id: 11129,
    user_id: "11d00a70-c708-4530-9439-7c75efa888a5",
    user: {
      username: "libyzxy0",
      avatar: "",
    },
    title: "Palindrome Checker",
    description:
      "This program prompts the user to input a string, then checks if it reads the same forward and backward, printing the result accordingly.",
    lang: "cpp",
    reactions: [
      {
        username: "shoti",
        reaction: "trash",
      },
      {
        username: "jane",
        reaction: "awesome",
      },
      {
        username: "marie",
        reaction: "awesome",
      },
      {
        username: "llian",
        reaction: "awesome",
      },
      {
        username: "althea",
        reaction: "awesome",
      },
      {
        username: "rens",
        reaction: "awesome",
      },
    ],
    code: `#include <iostream>
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
`,
  },
  {
    id: "63hva9m",
    user: {
      username: "libyzxy0",
      avatar: "",
    },
    title: "Palindrome Checker",
    description:
      "This program prompts the user to input a string, then checks if it reads the same forward and backward, printing the result accordingly.",
    lang: "cpp",
    reactions: [
      {
        username: "shoti",
        reaction: "trash",
      },
      {
        username: "jane",
        reaction: "awesome",
      },
      {
        username: "marie",
        reaction: "awesome",
      },
      {
        username: "llian",
        reaction: "awesome",
      },
      {
        username: "althea",
        reaction: "awesome",
      },
      {
        username: "rens",
        reaction: "awesome",
      },
    ],
    code: `#include <iostream>
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
`,
  },
];

export { posts };
