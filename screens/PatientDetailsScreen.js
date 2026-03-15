// import React, { useState } from "react";
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Image 
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const PatientDetailScreen = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [predictedOutput, setPredictedOutput] = useState("");

//   const handleImagePick = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//       setPredictedOutput("Prediction: Early signs of Alzheimer's detected."); // Simulated AI output
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Patient Details</Text>

//       {/* Upload Button */}
//       <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
//         <Text style={styles.uploadText}>Upload Photo</Text>
//       </TouchableOpacity>

//       {/* Display Uploaded Image */}
//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
//       )}

//       {/* Predicted Output */}
//       {predictedOutput && (
//         <View style={styles.predictionBox}>
//           <Text style={styles.predictionText}>{predictedOutput}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#1F2C77",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   uploadText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   uploadedImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   predictionBox: {
//     backgroundColor: "#F1F1F1",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   predictionText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default PatientDetailScreen;



// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import * as ImagePicker from "react-native-image-picker";

// const PatientDetailScreen = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [predictedOutput, setPredictedOutput] = useState("");

//   const handleImagePick = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo" }, async (response) => {
//       if (response.assets && response.assets.length > 0) {
//         const selectedImage = response.assets[0];
//         setImageUri(selectedImage.uri);

//         // Prepare image for upload
//         const formData = new FormData();
//         formData.append("image", {
//           uri: selectedImage.uri,
//           type: selectedImage.type || "image/jpeg",
//           name: "mri_scan.jpg",
//         });

//         try {
//             const res = await fetch("http://192.168.1.7:8080/predict_stage", {
//               method: "POST",
//               body: formData,
//               headers: { "Content-Type": "multipart/form-data" },
//             });        

//           const data = await res.json();
//           if (data.stage) {
//             setPredictedOutput(`${data.stage} (Confidence: ${data.confidence.toFixed(2)})`);
//           } else {
//             setPredictedOutput("Error processing image");
//           }
//         } catch (error) {
//           console.error("Upload error:", error);
//           setPredictedOutput("Failed to connect to backend");
//         }
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Patient Detail</Text>

//       <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
//         <Text style={styles.uploadText}>Upload MRI Scan</Text>
//       </TouchableOpacity>

//       {imageUri && <Image source={{ uri: imageUri }} style={styles.uploadedImage} />}

//       {predictedOutput && (
//         <View style={styles.predictionBox}>
//           <Text style={styles.predictionText}>Prediction: {predictedOutput}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
//   uploadButton: { backgroundColor: "#1F2C77", padding: 15, borderRadius: 8, alignItems: "center" },
//   uploadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   uploadedImage: { width: "100%", height: 200, borderRadius: 10, marginTop: 10 },
//   predictionBox: { backgroundColor: "#F1F1F1", padding: 15, borderRadius: 10, marginTop: 20 },
//   predictionText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
// });

// export default PatientDetailScreen;


import React, { useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";

const PatientDetailsScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Function to Pick Image
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image Picker Error:", response.error);
      } else {
        setImageUri(response.assets[0].uri); // Store selected image URI
        uploadImage(response.assets[0].uri);
      }
    });
  };

  // Function to Upload Image & Get Prediction
  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });

    try {
      const response = await axios.post("http://192.168.1.7:8080/predict_stage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data.stage); // Store prediction result
      Alert.alert("Prediction Result", `Stage: ${response.data.stage}`);
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "Failed to get prediction. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Patient Details</Text>

      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

      <Button title="Select Image" onPress={pickImage} />
      {prediction ? <Text style={{ marginTop: 10 }}>Prediction: {prediction}</Text> : null}
    </View>
  );
};

export default PatientDetailsScreen;
