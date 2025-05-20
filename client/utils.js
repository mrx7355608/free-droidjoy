export const handleButtonPress = (button, action) => {
  try {
    fetch("http://192.168.100.6:5000/button", {
      method: "post",
      body: JSON.stringify({ button, action }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
  }
};
