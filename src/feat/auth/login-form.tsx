import {
  Box,
  Link,
  NoSsr,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BasicTabs, { TabItem } from "@/common/components/tabs";
import { PrimaryButton } from "@/common/components/button";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { useQuery } from "@tanstack/react-query";
import { useLogin, useVerify } from "@/common/hooks/use-login";
import useLocalStorage from "@/common/hooks/use-local-storage";
import router from "next/router";

const LoginForm = () => {
  const theme = useTheme();

  const [token, setToken] = useLocalStorage("token", "");

  const { mutateAsync: handleLogin } = useLogin({
    config: {
      onSuccess: (data) => {
        setToken(data.token.accessToken);
      },
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSession = async (token: string) => {
    const verify = await useVerify(token);

    if (verify) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!token) return;

    handleSession(token);
  }, [token]);

  return (
    <NoSsr>
      <Box
        sx={{
          backgroundImage: `url('/images/background-login.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: theme.palette.primary.main,
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "562px",
            minWidth: "550px",
            background: "#fff",
            padding: "40px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            overflowY: "auto",
            "@media (max-width: 550px)": {
              minWidth: "unset",
              width: "100%",
              padding: "40px 16px",
            },
          }}
        >
          <Box className="div-center" sx={{ mb: 3 }}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={150}
              layout="fixed"
              priority
            />
          </Box>

          <Box sx={{ mb: 3, width: "402px" }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin({ email, password });
              }}
              sx={{ display: "block" }}
            >
              <TextField
                name="email"
                type="email"
                autoComplete="email"
                placeholder={"Email"}
                label={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="password"
                type="password"
                autoComplete="password"
                placeholder={"Password"}
                label={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <PrimaryButton
                type="submit"
                fullWidth
                sx={{ mb: 2 }}
                size="large"
              >
                Login
              </PrimaryButton>
              <Box
                sx={{ width: "100%", textAlign: "center", cursor: "pointer" }}
              >
                <Link>
                  <Typography
                    variant="button"
                    sx={{
                      textAlign: "center",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Forgot Password
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>

          <Typography variant="caption" sx={{ color: "grey.600" }}>
            Blended Learning App 1.0.0
          </Typography>
        </Box>
      </Box>
    </NoSsr>
  );
};

export default LoginForm;