<template>
    <section class="product-benefits">
        <div class="container">
            <div class="product-benefits__row">
                <div class="product-benefits__line"></div>
                <div class="product-benefits__item">
                    <div class="product-benefits__main-text gradient-text">3 года</div>
                    <div class="product-benefits__sub-text">гарантия на оборудование</div>
                </div>
                <div class="product-benefits__line"></div>
                <div class="product-benefits__item">
                    <div class="product-benefits__main-text gradient-text">24/7</div>
                    <div class="product-benefits__sub-text">техническая поддержка</div>
                </div>
                <div class="product-benefits__line"></div>
                <div class="product-benefits__item">
                    <div class="product-benefits__main-text gradient-text">~40%</div>
                    <div class="product-benefits__sub-text">экономия места в шкафу</div>
                </div>
                <div class="product-benefits__line"></div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "productBenefits",
    }
</script>

<style lang="scss" scoped>
    .product-benefits {
        padding: 120px 0;

        @media (max-width: 768px) {
            padding: 60px 0;
        }

        &__row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 850px) {
                flex-direction: column;
            }
        }

        &__item {
            flex: 0 0 32%;
        }
        
        &__line {
            width: 1px;
            height: 250px;
            background: linear-gradient(90deg, #FF02A9 -5.48%, #91017D 14.37%, #B0017C 25.72%, #640183 47.83%, #9C0191 78.46%, #FF0EBA 107.95%);

            @media (max-width: 850px) {
                &:first-child, &:last-child {
                    display: none;
                }

                margin: 48px 0;
                width: 70%;
                height: 1px;
            }
        }

        &__main-text {
            font-size: clamp(3.75rem, 2.727rem + 5.11vw, 6.563rem);
            text-align: center;
            margin: 20px 0 0 0;

            @media (max-width: 768px) {
                margin: 0;
            }
        }

        &__sub-text {
            font-size: clamp(0.875rem, 0.73rem + 0.73vw, 1.375rem);
            color: $colored-text;
            text-align: center;
        }
    }

</style>