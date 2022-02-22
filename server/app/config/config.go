package config

import "github.com/joho/godotenv"

func GetEnv() error {
	if err := godotenv.Load("./../../.env"); err != nil {
		return err
	}

	return nil
}
