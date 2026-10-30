export interface AuthResponse {
  success: boolean;
  message: string;
  otp?: string;
}

export const authService = {
  // Simulate sending OTP to Phone or Email
  async sendOtp(contact: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency
    const isPhone = /^[6-9]\d{9}$/.test(contact.trim());
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

    if (!isPhone && !isEmail) {
      return { success: false, message: "Invalid contact format" };
    }

    return { 
      success: true, 
      message: `OTP dispatched to ${contact}`,
      otp: "123456" // Default test OTP
    };
  },

  // Verify OTP
  async verifyOtp(contact: string, otp: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (otp === "123456") {
      return { success: true, message: "Verification successful" };
    }
    return { success: false, message: "Invalid OTP entered" };
  }
};
