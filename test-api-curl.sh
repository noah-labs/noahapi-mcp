#!/bin/bash

echo "Testing Noah Business API with curl..."
echo

read -p "Please enter your Noah API key: " API_KEY

echo
echo "Testing different API endpoints..."
echo

echo "1. Testing sandbox API v1..."
curl -X GET "https://api.sandbox.noah.com/v1/customers" \
  -H "Api-Signature: $API_KEY" \
  -H "Content-Type: application/json"
echo
echo

echo "2. Testing sandbox API (no version)..."
curl -X GET "https://api.sandbox.noah.com/customers" \
  -H "Api-Signature: $API_KEY" \
  -H "Content-Type: application/json"
echo
echo

echo "3. Testing production API..."
curl -X GET "https://api.noah.com/customers" \
  -H "Api-Signature: $API_KEY" \
  -H "Content-Type: application/json"
echo
echo

echo "4. Testing hosted onboarding endpoint..."
curl -X POST "https://api.sandbox.noah.com/v1/customers/hosted-onboarding" \
  -H "Api-Signature: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"CustomerID":"test-customer-123","ReturnURL":"https://example.com/complete"}'
echo
echo

echo "API testing complete!" 