const mockProfiles = Array(100).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    role: 'Student',
    major: `Major ${i % 5 + 1}`,
    year: `Year ${i % 4 + 1}`,
    fatherName: `Father ${i + 1}`,
    motherName: `Mother ${i + 1}`,
    email: `student${i + 1}@example.com`,
    address: `Address ${i + 1}, City, State, ZIP`,
    mobile: `+1234567890${i}`,
    college: `College ${i + 1}`,
    course: `Course ${i % 5 + 1}`,
    abcid: `ABC${100000 + i}`,
    aadhaar: `9876${543210 + i}`,
    avatar: `https://i.pravatar.cc/300?img=${i + 1}`,
    signature: "/placeholder.svg?height=50&width=150"
}))

export default mockProfiles;