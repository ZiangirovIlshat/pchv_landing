<template>
    <div class="pop-up">
        <div class="pop-up__close-btn"></div>
        <div class="pop-up__row">
            <div class="pop-up__column text-col">
                <h2 class="pop-up__heading h2-heading gradient-text">Получить консультацию</h2>

                <form action="">
                    <p>
                        <label for="name">Имя
                            <input type="text" name="name">
                        </label>
                    </p>
                    <p>
                        <label for="email">E-mail
                            <input type="email" name="email">
                        </label>
                    </p>
                    <p>
                        <label for="number"><span><img src="../../../assets/images/flagRussia.png" alt=""></span> +7
                            <input type="number" name="number">
                        </label>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="Опишите для какой сферы и задач требуется преобразователь частоты"></textarea>
                    </p>
                    <p>
                        <label for="agreement">
                            <input type="checkbox" name="agreement">
                            Я прочел и соглашаюсь с<a href="/">политикой обработки персональных данных</a>
                        </label>
                    </p>
                    
                    <button class="btn" type="submit">Оставить заявку</button>
                </form>
            </div>
            <div class="pop-up__column img-col">
                <img src="../../../assets/images/popUp.png" alt="ПЧВ">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popUp"
    }
</script>

<style lang="scss" scoped>
.pop-up {
    background-color: #fff;
    width: 1200px;
    height: 700px;
    position: relative;
    
    color: rgba(18, 1, 36, 0.5);
    font-size: 22px;

    &__close-btn {
        width: 35px;
        height: 35px;
        margin-left: auto;
        margin-top: 20px;
        margin-right: 20px;

        position: relative;
        cursor: pointer;

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                &::before, &::after {
                    background-color: $secondary-color;
                }
            }
        }

        &::before, &::after {
            position: absolute;
            top: 15px;
            right: 7px;
            content: "";
            width: 20px;
            height: 1px;
            background-color: $primary-color;
        }
        
        &::before {
            transform: rotate(-45deg);
        }

        &::after {
            transform: rotate(45deg);
        }
    }

    &__row {
        display: flex;
        height: 100%;
    }

    &__column {
        &.text-col {
            flex: 0 0 60%;
            padding: 0 0 50px 20px;

            display: flex;
            flex-direction: column;

            p {
                border-bottom: 1px solid rgba(75, 20, 102, 0.5);
                margin: 0 0 10px 0;

                &:nth-child(4) {
                    margin: 0 0 20px 0;
                }

                &:nth-child(5) {
                    border-bottom: none;
                    justify-content: start;
                    font-size: 16px;
                    margin: 0 0 50px 0;
                }
            }
        }

        &.img-col {

            img {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }

    &__heading {
        margin: 0 0 50px 0;
    }

    form {

        flex: 1;

        label {
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: start;

            span {
                display: block;
                width: 38px;
                height: 22px;
                margin: 0 0 6px 0;
            }

            a {
                color: $primary-color;

                @media (hover: hover) and (pointer: fine) {
                    &:hover {
                        color: $secondary-color;
                    }
                }
            }
        }

        input, textarea {
            font-size: 22px;
            color: rgba(75, 20, 102, 0.7);
        }

        input {
            border: none;
            background: none;
            padding: 10px 0;
            flex: 1;
 
            &:focus, &:focus-visible {
                border: none;
                outline: none;
            }

            &[type="checkbox"] {
                max-width: 22px;
                min-width: 22px;
                max-height: 22px;
                min-height: 22px;

                margin: 0 0 3px 0;

                border: 1px solid rgba(75, 20, 102, 0.5);
            }
        }

        textarea {
            width: 100%;
            border: none;
            background: none;

            resize: none;

            font-size: inherit;
            letter-spacing: inherit;
            font-family: inherit;
            font-weight: inherit;

            &:focus, &:focus-visible {
                border: none;
                outline: none;
            }
        }
    }
}

</style>